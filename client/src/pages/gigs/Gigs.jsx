import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [gigdata, setData] = useState([]); // Initialized with an empty array
  const [filterData, setFilterData] = useState([]); // Initialized with an empty array
  const minRef = useRef();
  const maxRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get(`/gigs`).then((res) => {
        setData(res.data);
        setFilterData(res.data);
        return res.data;
      }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      let sortedData = [...data];
      switch (sort) {
        case "sales":
          sortedData.sort((a, b) => b.sales - a.sales); // Assuming each gig has a 'sales' property
          break;
        case "createdAt":
          sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Assuming the data is in Date format
          break;
        // Add more cases if you have other sort options
        default:
          break;
      }
      setFilterData(sortedData);
    }
  }, [sort, data]);

  const apply = () => {
    let minValue = minRef.current.value ? parseFloat(minRef.current.value) : -Infinity; // use -Infinity if no value is provided
    let maxValue = maxRef.current.value ? parseFloat(maxRef.current.value) : Infinity; // use Infinity if no value is provided
  
    const filteredGigs = gigdata.filter(gig => {
      return gig.price >= minValue && gig.price <= maxValue;
    });
  
    setFilterData(filteredGigs);
  };
  

  const handleSelectionChange = (e) => {
    setSelectedOption(e.target.value); // Keep track of the selected option
    const category = e.target.value;
    let newValue = [];
    if (category === "") {
      newValue = data;
    } else {
      newValue = data.filter((gig) => gig.cat === category);
    }
    setFilterData(newValue);
  };

  return (
    <div className="gigs">
      <div className="container">
        <h1>All Subjects</h1>
        <p>Explore the boundaries of art and technology with Stuadvisors</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
            <span>Categories</span>
            <select value={selectedOption} onChange={handleSelectionChange}>
              <option value="" disabled selected hidden>
                Select Category{" "}
              </option>
              <option value="Design">Design</option>
              <option value="WebDevelopment">Web Development</option>
              <option value="DataAnalytics">Data Analytics</option>
              <option value="CloudComputing">Cloud Computing</option>
              <option value="CyberSecurity">Cyber Security</option>
              <option value="ArtificialIntelligence">
                Artificial intelligence
              </option>
              <option value="MachineLearning">Machine Learning</option>
              <option value="Management">Management</option>
              <option value="HRM">HRM</option>
              <option value="SCM">SCM</option>
              <option value="Finance">Finance</option>
              <option value="Law">Law</option>
              <option value="Cookery">Cookery</option>
              <option value="Journalism">Journalism</option>
              <option value="MassCommunication">MassCommunication</option>
              <option value="Accounts">Accounts</option>
              <option value="Sociology">Sociology</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Nursing">Nursing</option>
            </select>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : filterData.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
        <div className="cards">
          {filterData.length === 0 && <h2>No consultant for the subject found</h2>}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
