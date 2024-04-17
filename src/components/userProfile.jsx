import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { app } from "/firebaseConfig";
import { motion } from "framer-motion";

function UserProfile({ userId, onClose }) {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");

  // Prop types validation
  UserProfile.propTypes = {
    userId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const dbRef = ref(getDatabase(app));
        const userRef = child(dbRef, `users/${userId}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserProfile(snapshot.val());
          setEditedUsername(snapshot.val().username); // Initialize editedUsername with current username
        } else {
          console.error("User not found in database");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();

    return () => {
      setUserProfile(null);
    };
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const dbRef = ref(getDatabase(app));
      await update(child(dbRef, `users/${userId}`), {
        username: editedUsername,
      });

      // Update userProfile state with the new username
      setUserProfile((prevState) => ({
        ...prevState,
        username: editedUsername,
      }));

      localStorage.setItem("userName", editedUsername);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancelClick = () => {
    // Reset editedUsername back to the original username
    setEditedUsername(userProfile.username);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg relative w-fit h-3/6">
        <button className="absolute top-0 right-0 m-2" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {userProfile && (
          <div className="font-itim text-3xl">
            <u>
              <h2 className="text-4xl font-bold mb-2 text-center">
                User Profile
              </h2>
            </u>
            <p>
              Username:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                  className="border rounded-md p-1 mb-2 shadow-md border-solid border-gray-300"
                />
              ) : (
                userProfile.username
              )}
            </p>
            <p>Email: {userProfile.email}</p>
            <h3 className="text-3xl font-bold mt-4">Your Best Scores:</h3>
            <p className="inline-flex justify-center items-center">
              <img
                src="easy.png"
                alt="Bullet Point Image"
                className="w-7 h-7 mr-2"
              />
              Certified Cherry: {userProfile.easy}
            </p>
            <br />
            <p className="inline-flex justify-center items-center">
              <img
                src="mid.png"
                alt="Bullet Point Image"
                className="w-7 h-8 mr-2"
              />
              Getting There: {userProfile.medium}
            </p>
            <br />
            <p className="inline-flex justify-center items-center">
              <img
                src="hard.png"
                alt="Bullet Point Image"
                className="w-7 h-7 mr-2"
              />
              Tomato Crusher: {userProfile.hard}
            </p>
            {/* Render edit and save buttons based on editMode */}
            {!editMode && (
              <div className="w-fit">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-10 w-fit"
                  >
                    Edit Profile
                  </button>
                </motion.div>
              </div>
            )}
            {editMode && (
              <div className="inline-flex">
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 mr-4"
                  >
                    Save
                  </button>
                </motion.div>
                <motion.div
                  className="box"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Cancel
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
