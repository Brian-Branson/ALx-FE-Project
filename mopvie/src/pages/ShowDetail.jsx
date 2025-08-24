import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchShowDetails } from "../services/tmdb.js";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShow = async () => {
      try {
        const data = await fetchShowDetails(id);
        setShow(data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadShow();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!show) return <p className="text-center mt-10">Show not found</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {show.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-2">{show.name}</h1>
          <p className="text-gray-400 mb-2">
            First Air Date: {show.first_air_date || "N/A"}
          </p>
          <p className="text-yellow-400 mb-4">⭐ {show.vote_average.toFixed(1)}</p>
          <p className="text-lg">{show.overview}</p>
        </div>
      </div>
    </main>
  );
};

export default ShowDetail;
