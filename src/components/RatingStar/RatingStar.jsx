import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RatingStar = ({ ratingsAverage }) => {
  return (
    <div className="flex justify-between items-center">
      <span>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            className={`${
              ratingsAverage >= star ? "text-yellow-400" : "text-gray-400"
            }`}
            icon={faStar}
            key={star}
          />
        ))}
      </span>

      <span className="ms-1 text-xs bg-blue-100 font-semibold rounded-md px-2">
        {ratingsAverage}
      </span>
    </div>
  );
};

export default RatingStar;
