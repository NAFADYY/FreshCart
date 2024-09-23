import useGetBrands from "../../hooks/Brands/useGetBrands";
import categories from "../../hooks/useCategories";
import subCategories from "../../hooks/SubCategories/useGetSubCat";
import { useRef, useState } from "react";
const SearchProducts = ({ setProducts, allProducts }) => {
  const [catId, setCatId] = useState("");
  const { data } = useGetBrands();
  const brands = data?.data?.data;
  const { data: categoriesData } = categories();
  const allCategories = categoriesData?.data?.data;
  const categoryRef = useRef(null);
  const { data: subCatData } = subCategories({ categoryId: catId });
  const subCategoryData = subCatData?.data?.data;

  return (
    <>
      <div className="mx-auto max-w-md py-7">
        <div className="relative mx-auto w-max">
          <input
            onChange={(e) => {
              const filtered = allProducts?.data?.data?.filter((product) =>
                product.title
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setProducts(filtered);
            }}
            type="search"
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-green-500 focus:pl-16 focus:pr-4"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-green-500 peer-focus:stroke-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5 py-5">
        <select
          onChange={(e) => {
            const filtered = allProducts?.data?.data?.filter((product) =>
              product.brand.name
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
            );
            setProducts(filtered);
          }}
          id="large"
          className="block py-2 px-3  outline-none text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 "
        >
          <option selected disabled className="text-center">
            By Brand
          </option>
          {brands?.map((brand) => (
            <option key={brand._id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          ref={categoryRef}
          onChange={(e) => {
            const filtered = allProducts?.data?.data?.filter((product) =>
              product.category.name
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
            );
            const id =
              e.target.options[e.target.selectedIndex].dataset.category;
            setCatId(id);
            setProducts(filtered);
          }}
          id="large"
          className="block py-2 px-3 outline-none text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 "
        >
          <option selected disabled className="text-center">
            By Category
          </option>
          {allCategories?.map((category) => (
            <option
              key={category._id}
              value={category.name}
              data-category={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <select
          disabled={!catId}
          onChange={(e) => {
            const filtered = allProducts?.data?.data?.filter((product) =>
              product.subcategory[0].name
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
            );
            setProducts(filtered);
          }}
          id="large"
          className="block py-2 px-3  outline-none text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 "
        >
          <option selected disabled className="text-center">
            By SubCategory
          </option>
          {subCategoryData?.map((subCat) => (
            <option key={subCat._id} value={subCat.name}>
              {subCat.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SearchProducts;
