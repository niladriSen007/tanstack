import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";

const Products = () => {
  //   const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const prod = await response.json();
    // console.log(prod?.products)
    // setProducts(prod?.products);
    return prod?.products;
  };

  const {
    isLoading,
    isError,
    data: Products,
  } = useQuery({ queryKey: ["products"], queryFn: fetchProducts});

  //   if (!products) {
  //     return <button onClick={fetchProducts}>Fetch Products</button>;
  //   }

  if(isLoading)
    return <div>Loading...</div>

    if(isError)
        return <div>Error...</div>

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-4 gap-16 ">
          {Products?.map((product) => (
            <Link
              to={`/products/${product?.id}`}
              key={product.id}
              className="group relative"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  //   alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {/* <a href={product.href}> */}
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                    {/* </a> */}
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
