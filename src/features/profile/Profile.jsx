import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import api from '../../api/axios';
import '/src/styles/main.scss';

const Profile = () => {
  const dispatch = useDispatch();

  // State for profile data and UI status
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/me');
        setProfile(response.data.user);
        dispatch(setUser(response.data.user)); // Sync Redux store
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Failed to load profile. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Save updated profile (with optional image)
  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      // Build the updated profile payload
      const updatedData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        address: profile.address,
        zip: profile.zip,
        city: profile.city,
        phone: profile.phone,
      };

      // Handle profile picture upload if provided
      if (selectedFile) {
        const formData = new FormData();
        formData.append('picture', selectedFile);

        const uploadResponse = await api.post(`/user/${profile.id}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setProfile((prev) => ({
          ...prev,
          picture: uploadResponse.data.filename,
        }));

        updatedData.picture = uploadResponse.data.filename;
      }

      // Submit profile updates
      await api.put(`/user/${profile.id}`, updatedData);
      setMessage('Profile updated successfully.');
      setEditing(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  // Display loading state
  if (loading) return <div className="profile-message">Loading profile...</div>;

  // Display error or missing profile
  if (!profile) return <div className="profile-message error">{message || 'Profile not found.'}</div>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>

      {message && <p className="profile-message">{message}</p>}

      {/* Display profile image if available */}
      {profile.picture && (
        <div className="profile-image-wrapper">
          <img
            src={`http://ihsanerdemunal.ide.3wa.io:9500/uploads/${profile.picture}?t=${Date.now()}`}
            alt="Profile"
            className="profile-image"
          />
        </div>
      )}

      {/* Editable form */}
      {editing ? (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} className="profile-file-input" />
          <div className="profile-form">
            {['firstName', 'lastName', 'email', 'address', 'zip', 'city', 'phone'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                value={profile[field] ?? ''}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </div>
        </>
      ) : (
        // Read-only display
        <div className="profile-details">
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>City:</strong> {profile.city}</p>
          <p><strong>ZIP:</strong> {profile.zip}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="profile-actions">
        {editing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-green"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="btn btn-blue"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
