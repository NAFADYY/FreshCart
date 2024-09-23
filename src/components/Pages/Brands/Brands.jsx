import { Helmet } from "react-helmet";
import useGetBrands from "../../../hooks/Brands/useGetBrands";
import Loader from "../../Loader/Loader";
import ErrorComponenet from "../../ErrorComponenet/ErrorComponenet";
import useSpecificBrand from "../../../hooks/Brands/useSpecificBrand";
import { useState } from "react";
import Modal from "../../Modal/Modal";

const Brands = () => {
  const { data, isLoading, isError } = useGetBrands();
  const [brandId, setBrandId] = useState("");
  const [modal, setModal] = useState(false);
  const { data: specificBrand, isLoading: specificLoading } = useSpecificBrand({
    brandId: brandId,
  });
  const brands = data?.data?.data;
  const specificBrandData = specificBrand?.data?.data;

  const specificBrandHandeller = (brandId) => {
    setModal(true);
    setBrandId(brandId);
  };

  <Helmet>
    <title>Brands</title>
  </Helmet>;

  if (isError) return <ErrorComponenet />;
  if (isLoading) return <Loader />;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      {modal && (
        <Modal
          setModal={setModal}
          specificBrandData={specificBrandData}
          isLoading={specificLoading}
        />
      )}
      <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
        All Brands
      </h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 justify-center items-center">
          {brands?.map((brand) => (
            <div
              key={brand._id}
              className="overflow-hidden group relative rounded-lg p-[1px] flex justify-center items-center"
            >
              <div className="rounded-lg hidden group-hover:block animate-gradient w-[250%] h-[500%] absolute -top-[60%] -left-[50%] bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 shadow-xl" />
              <div
                className="block w-full relative cursor-pointer rounded-lg bg-white "
                onClick={() => {
                  specificBrandHandeller(brand._id);
                }}
              >
                <div className="text-center ">
                  <img src={brand.image} alt={brand.name} />
                  <p className="m-2 text-sm text-gray-500">{brand.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
