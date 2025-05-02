import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { setToken, setRole, logout } from '../../redux/userSlice';
import api from "../../api/axios";

const Profile = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/me');
        setProfile(response.data.user);
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
        setMessage('❌ Failed to load profile. Please login again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      let updatedData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        address: profile.address,
        zip: profile.zip,
        city: profile.city,
        phone: profile.phone,
      };

      if (selectedFile) {
        const formData = new FormData();
        formData.append('picture', selectedFile);

        const uploadResponse = await api.post(`/user/${profile.id}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Update the profile state safely
        setProfile((prev) => ({
          ...prev,
          picture: uploadResponse.data.filename
        }));

        updatedData.picture = uploadResponse.data.filename;
      }

      await api.put(`/user/${profile.id}`, updatedData);

      setMessage('✅ Profile updated successfully!');
      setEditing(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      setMessage('❌ Error updating profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">⏳ Loading profile...</div>;
  if (!profile) return <div className="p-4 text-red-500">{message || "Profile not found."}</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      {message && <p className="mb-4 text-center text-green-500">{message}</p>}

      <div className="space-y-4">
        {profile.picture && (
          <div className="flex justify-center mb-4">
            <img
              src={`/uploads/${profile.picture}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
            />
          </div>
        )}

        {editing ? (
          <>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            <div className="space-y-2">
              {['firstName', 'lastName', 'email', 'address', 'zip', 'city', 'phone'].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={profile[field] ?? ''}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border p-2 w-full rounded"
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>City:</strong> {profile.city}</p>
            <p><strong>ZIP:</strong> {profile.zip}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </>
        )}
      </div>

      <div className="mt-6 flex gap-4 justify-center">
        {editing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
