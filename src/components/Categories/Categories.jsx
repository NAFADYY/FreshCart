import { Link } from "react-router-dom";
import categories from "../../hooks/useCategories";
import Slider from "react-slick";
const Categories = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { data } = categories();
  const categoriesData = data?.data?.data;

  return (
    <>
      <div className="py-10">
        <h2 className="py-3 text-xl">Shop Poupular Categories</h2>
        <Slider {...settings}>
          {categoriesData &&
            categoriesData.map((category) => (
              <div
                key={category._id}
                className="image cursor-pointer outline-none "
              >
                <Link
                  to={`/FreshCart/subCategories/${category._id}/${category.name}`}
                >
                  <img
                    src={category.image}
                    className="w-full h-[200px] "
                    alt={category.name}
                  />
                  <h3>{category.name}</h3>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default Categories;
