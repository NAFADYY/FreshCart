import { useParams } from "react-router";
import useGetSubCat from "../../../hooks/SubCategories/useGetSubCat";
import Loader from "../../Loader/Loader";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
const SubCategories = () => {
  const { categoryId, categoryName } = useParams();
  const { data, isLoading, isError } = useGetSubCat({ categoryId });
  const subCategories = data?.data?.data;

  if (isError) {
    return <ErrorComponenet />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h2 className="py-5 text-center font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
        SubCategories of {categoryName}
      </h2>
      <div className="py-20">
        {!subCategories.length > 0 && (
          <div>
            <h3>
              Currently, there are no subcategories available under the{" "}
              {categoryName} category.
            </h3>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-5 w-full ">
          {subCategories?.map((subCategory) => (
            <div
              key={subCategory._id}
              className="p-5 text-2xl border-gray-200 border-2"
            >
              {subCategory.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategories;
