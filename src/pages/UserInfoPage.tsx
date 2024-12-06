import { useState, useEffect } from "react";
import { getUserProfile } from "../handler/users.handler";
import { toast } from "react-toastify";

export default function UserInfoPage() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  
  const calculateAverageRating = (products: any[]) => {
    if (!products || products.length === 0) return 0; 
    const totalRating = products.reduce((sum, product) => {
      const rating = parseFloat(product.product_sustainability_rating) || 0; 
      return sum + rating;
    }, 0);
    return totalRating / products.length; 
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("Fetched products:", response.products); 

        setUserProfile(response.user); 
        setProducts(response.products); 

        
        const avg = calculateAverageRating(response.products);
        console.log("Average Rating:", avg);
        setAverageRating(avg);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        toast.error(`Failed to fetch user profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-tertiary-light">
        <p className="text-text-primary text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-tertiary-light min-h-screen w-full flex flex-col items-center">
      {/* Title */}
      <h1 className="text-[32px] font-normal text-center mt-10 text-text-primary">
        Your History
      </h1>

      {/* Info Section */}
      <div className="mx-auto mt-6 bg-white rounded-lg border border-secondary-500 flex items-center w-[90%] max-w-[400px] shadow-md">
        <div className="flex flex-col items-center justify-center px-4 py-2 border-r border-gray-300 w-1/2">
          <div className="text-[20px] font-medium text-text-secondary text-center">
            {userProfile ? userProfile.display_name : "Loading..."}
          </div>
          <div className="text-[14px] font-normal mt-1 text-text-secondary text-center">
            {userProfile ? `Created: ${userProfile.created_at}` : "Loading..."}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-4 py-2 w-1/2">
          <div className="text-[14px] font-normal text-text-secondary text-center">
            Sustainability Rating
          </div>
          <div className="text-[20px] font-bold text-text-secondary flex items-center mt-1 text-center">
            {averageRating.toFixed(1)}{" "}
            <span className="ml-1 text-yellow-500">★</span>
          </div>
        </div>
      </div>

      {/* Product List */}
      <main className="flex-grow flex flex-col items-center w-full px-4 mt-10">
        <div className="w-full max-w-[500px] bg-white rounded-lg border border-secondary-500 shadow-md divide-y divide-gray-200">
          {products.length === 0 ? (
            <p className="text-center p-6 text-text-secondary">
              No history found
            </p>
          ) : (
            products.map((product, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
              >
                <div className="flex-1">
                  <h2 className="text-text-secondary font-semibold text-[18px]">
                    {product.product_name || "Unknown Product"}
                  </h2>
                  <div className="flex items-center text-text-secondary mt-1">
                    <span className="text-[16px] font-bold">
                      {product.product_sustainability_rating
                        ? parseFloat(product.product_sustainability_rating).toFixed(1)
                        : "N/A"}
                    </span>
                    <span className="ml-1 text-yellow-500">★</span>
                    <span className="ml-4 text-[14px] text-gray-500">
                      {product.created_at || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-lg overflow-hidden ml-4 bg-gray-100">
                  <img
                    src={product.product_image || "https://via.placeholder.com/64"}
                    alt={product.product_name || "Product Image"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
