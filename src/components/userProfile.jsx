import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { app } from "/firebaseConfig";
import { motion } from "framer-motion";

function UserProfile({ userId, onClose }) {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [usernameExistsError, setUsernameExistsError] = useState("");
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

      // Check if the edited username is the same as the original username
      if (editedUsername.toLowerCase() !== userProfile.username.toLowerCase()) {
        // If different, check if the new username already exists
        const usernameExists = await checkUsernameExists(editedUsername);
        if (usernameExists) {
          setUsernameExistsError("*Username already exists");
          return;
        }
      }

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

  // Function to check if the username exists
  const checkUsernameExists = async (username) => {
    const dbRef = ref(getDatabase(app));
    const usernameRef = child(dbRef, "users");
    const snapshot = await get(usernameRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const usernames = Object.values(userData).map((user) =>
        user.username.toLowerCase()
      );
      return usernames.includes(username.toLowerCase());
    } else {
      return false;
    }
  };

  const handleCancelClick = () => {
    // Reset editedUsername back to the original username
    setEditedUsername(userProfile.username);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
        className=""
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
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
            <div>
              Username:{" "}
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => {
                      setEditedUsername(e.target.value);
                      setUsernameExistsError(""); // Reset username exists error on input change
                    }}
                    className="border rounded-md p-1 mb-2 shadow-md border-solid border-gray-300"
                  />
                  {usernameExistsError && (
                    <div className="text-red-500 text-lg text-center">
                      {usernameExistsError}
                    </div>
                  )}
                </>
              ) : (
                userProfile.username
              )}
            </div>

            <p>Email: {userProfile.email}</p>
            <div className="select-none">
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
              <br />
            </div>
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
      </motion.div>
    </div>
  );
}

export default UserProfile;
