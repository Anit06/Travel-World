import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'; // Import updateDoc
import { db, auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Users = () => {
  const { data: userData, loading } = useGetData('users');
  const [users, setUsers] = useState([]);
  const currentUser = auth.currentUser;


  useEffect(() => {
    // Set default roles for all users
    if (userData && userData.length > 0) {
      const updatedUsers = userData.map((user) => {
        // Check if the user has a role defined, if not, set role to 'user'
        const role = user.role ? user.role : 'user';
        return { ...user, role: role };
      });
      setUsers(updatedUsers);
    }
  }, [userData]);
  
  
  

  const deleteUser = async (id) => {
    try {
      // Step 1: Delete Firestore document
      await deleteDoc(doc(db, 'users', id));
      toast.success('User data deleted');

      // Step 2: Delete user from Firebase Authentication
      await auth().deleteUser(id); // Delete user from Firebase Auth
      toast.success('User deleted from Firebase Authentication!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      // Check if current user is admin
      if (currentUser && currentUser.email === 'anitsamanta2002@gmail.com') {
        // Set default role to 'user' if no role is selected
        const newRole = role || 'user';
  
        // Update user role only if the new role is different
        const userToUpdate = users.find(user => user.uid === id);
        if (userToUpdate.role !== newRole) {
          // Update user role in Firestore
          await updateDoc(doc(db, 'users', id), { role: newRole });
          toast.success('User role updated successfully!');
  
          // Update the users state to reflect the changed role
          const updatedUsers = users.map(user => {
            if (user.uid === id) {
              return { ...user, role: newRole };
            }
            return user;
          });
          setUsers(updatedUsers);
        } else {
          toast.info('User role remains unchanged.');
        }
      } else {
        // User is not authorized to change roles
        toast.error('You are not authorized to change user roles!');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  
  
  
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className='fw-bold'>Users</h4>
          </Col>
          <Col lg='12' className='pt-5'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <h5 className='pt-5 fw-bold'>Loading.....</h5>
                ) : (
                  users.map((user) => (
                    <tr key={user.uid}>
                      <td>
                        <img src={user.photoURL} alt='' />
                      </td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          className='form-select'
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                          disabled={currentUser.email !== 'anitsamanta2002@gmail.com'}
                        >
                          {['admin', 'subadmin', 'user'].map((role) => (
                            <option key={role} value={role}>
                              {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => deleteUser(user.uid)}
                          disabled={currentUser.email !== 'anitsamanta2002@gmail.com'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Users;
