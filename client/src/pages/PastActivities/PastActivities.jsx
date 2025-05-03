import React, { useState, useEffect } from "react";
import styles from "./PastActivities.module.css";
import Masonry from "react-masonry-css";
import backendUrl from "../../backendUrl";
import PostCard from "../../components/PostCard/PostCard";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination/Pagination";

const PastActivities = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (url) => {
    setIsLoading(true);
  
    try {
      const res = await fetch(url);
  
      // Check the status and response
      if (res.status !== 200) {
        throw new Error('Failed to fetch data from the server');
      }
  
      const resData = await res.json();
  
      // Log the response data for debugging
      console.log("Fetched Data:", resData);
  
      if (!resData || !resData.posts) {
        toast.error("Failed to load posts");
        setData([]);  // Ensure data is set to an empty array if no posts
        return;
      }
  
      setData(resData);  // Set data from response
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getData(`${backendUrl}/past-activities/event`);
  }, []);

  return (
    <>
      <div style={{ paddingTop: "125px" }} className={styles.body}>
        <div className={styles["page-desc"]}>
          Take a look back at the impactful events we’ve hosted over time. These
          past activities hold the memories and milestones that shaped our
          journey towards social change. Relive the purpose, the people, and the
          progress made through these events.
        </div>
        <hr className={styles.hr} />

        <Masonry
          breakpointCols={{
            default: data?.posts?.length >= 3 ? 3 : 2,
            1100: 2,
            768: 1,
          }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : data?.posts?.length === 0 ? (
            <p>No past activities available</p>
          ) : (
            data?.posts?.map((item) => <PostCard key={item._id} data={item} />)
          )}
        </Masonry>
        {!isLoading && (
          <Pagination
            data={data}
            fetchData={getData}
            apiUrl={`${backendUrl}/past-activities`}
          />
        )}
      </div>
    </>
  );
};

export default PastActivities;
