import notFound from "../../../../public/images/images/error.svg";
const NotFound = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <img className="w-auto" src={notFound} alt="Not Found Page"></img>
    </div>
  );
};

export default NotFound;
