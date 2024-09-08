import "./searchItem.css";
import data from './searchItemData';

const SearchItem = ({ data }) => {
  return (
    <div className="searchItem">
      <img
        src={data.image}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{data.title}</h1>
        <span className="siDistance">{data.distance}</span>
        <span className="siTaxiOp">{data.taxiOp}</span>
        <span className="siSubtitle">
          {data.subtitle}
        </span>
        <span className="siFeatures">
          {data.features}
        </span>
        <span className="siCancelOp">{data.cancelOp}</span>
        <span className="siCancelOpSubtitle">
          {data.cancelOpSubtitle}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{data.rating}</span>
          <button>{data.ratingValue}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{data.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
};

const SearchItemList = () => {
  return (
    <div>
      {data.map((item, index) => (
        <SearchItem key={index} data={item} />
      ))}
    </div>
  );
};

export default SearchItemList;
