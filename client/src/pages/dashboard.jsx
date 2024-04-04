import { useState, useEffect } from "react";
import axios from "axios";

function DashboardPage() {
  const [userData, setUserData] = useState({
    username: "",
    totalDocuments: 0,
    documents: [],
  });

  // Function to fetch a single document's details
  const fetchDocumentDetails = async (docId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/documents/finddocument/${docId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch document data:", error);
      return null; // Handle errors gracefully
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const userResponse = await axios.get(
          `http://localhost:8080/api/v1/users/${userId}`
        );
        const userDocs = userResponse.data.allDocuments;

        const documentsDetails = await Promise.all(
          userDocs.map((docId) => fetchDocumentDetails(docId))
        );
        const validDocuments = documentsDetails.filter((doc) => doc !== null);

        setUserData({
          username: userResponse.data.name,
          totalDocuments: userDocs.length,
          documents: validDocuments,
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {userData.username}
        </h2>
        <p className="text-md text-gray-500">
          Total Documents Uploaded: {userData.totalDocuments}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.documents.map((doc, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            {doc.downloadUrl && (
              <img
                className="rounded-t-lg h-48 w-full object-cover"
                src={doc.downloadUrl}
                alt="Document Preview"
              />
            )}
            <div className="p-5">
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {doc.title}
              </h5>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                {doc.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
