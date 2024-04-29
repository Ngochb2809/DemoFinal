import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [editCategory, setEditCategory] = useState({ _id: '', name: '' });
    const [guests, setGuests] = useState([]);
    const [newGuest, setNewGuest] = useState({ name: '', dob: '', gender: '', address: '', email: '' ,password: '' });
    const [editGuest, setEditGuest] = useState({ _id: '', name: '', dob: '', gender: '', address: '', email: '' ,password: '' });
    const [bloggers, setBloggers] = useState([]);
    const [newBlogger, setNewBlogger] = useState({ name: '', dob: '', gender: '', address: '',email: '',password: ''});
    const [editBlogger, setEditBlogger] = useState({ _id: '', name: '', dob: '', gender: '', address: '',email: '',password: '' });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditCategoryTab, setShowEditCategoryTab] = useState(false);
    const [showEditGuestTab, setShowEditGuestTab] = useState(false);
    const [showEditBloggerTab, setShowEditBloggerTab] = useState(false);
    const [sidebarItem, setSidebarItem] = useState('');
    const navigate = useNavigate();

    // Function to fetch categories from the server
    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:4000/category', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Function to add a new category
    const handleAddCategory = async () => {
        try {
            const response = await fetch('http://localhost:4000/category/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            await fetchCategories();
            setNewCategory({ name: '' });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Function to edit a category
    const handleEditCategory = async () => {
        try {
            const response = await fetch(`http://localhost:4000/category/edit/${editCategory._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editCategory),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to edit category');
            }
            await fetchCategories();
            setShowEditCategoryTab(false);
            setEditCategory({ _id: '', name: '' });
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    // Function to delete a category
    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/category/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to delete category');
            }
            await fetchCategories();
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Function to fetch guests from the server
    const fetchGuests = async () => {
        try {
            const response = await fetch('http://localhost:4000/guest', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch guests');
            }
            const data = await response.json();
            setGuests(data);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    // Function to add a new guest
    const handleAddGuest = async () => {
        debugger;
        try {
            const response = await fetch('http://localhost:4000/guest/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGuest),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to add guest');
            }
            await fetchGuests();
            setNewGuest({ name: '', dob: '', gender: '', address: '', email: '', password: '',});
        } catch (error) {
            console.error('Error adding guest:', error);
        }
    };

    // Function to edit a guest
    const handleEditGuest = async () => {
        try {
            const response = await fetch(`http://localhost:4000/guest/edit/${editGuest._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editGuest),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to edit guest');
            }
            await fetchGuests();
            setShowEditGuestTab(false);
            setEditGuest({ _id: '', name: '', dob: '', gender: '', address: '', email: '', password: ''});
        } catch (error) {
            console.error('Error editing guest:', error);
        }
    };

    // Function to delete a guest
    // const handleDeleteGuest = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/guest/delete/${id}`, {
    //             method: 'DELETE',
    //             credentials: 'include',
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to delete guest');
    //         }
    //         await fetchGuests();
    //         setShowDeleteConfirmation(false);
    //     } catch (error) {
    //         console.error('Error deleting guest:', error);
    //     }
    // };

    const fetchBloggers = async () => {
        try {
            const response = await fetch('http://localhost:4000/blogger', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch bloggers');
            }
            const data = await response.json();
            setBloggers(data);
        } catch (error) {
            console.error('Error fetching bloggers:', error);
        }
    };

    useEffect(() => {
        fetchBloggers();
    }, []);

    const handleAddBlogger = async () => {
        debugger;
        try {
            const response = await fetch('http://localhost:4000/blogger/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBlogger),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to add blogger');
            }
            await fetchBloggers();
            setNewBlogger({ name: '', dob: '', gender: '', address: '',email: '',password: '',  });
        } catch (error) {
            console.error('Error adding blogger:', error);
        }
    };

    const handleEditBlogger = async () => {
        try {
            const response = await fetch(`http://localhost:4000/blogger/edit/${editBlogger._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editBlogger),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Failed to edit blogger');
            }
            await fetchBloggers();
            setShowEditBloggerTab(false);
            setEditBlogger({ _id: '', name: '', dob: '', gender: '', address: '', email: '', password: '' });
        } catch (error) {
            console.error('Error editing blogger:', error);
        }
    };

    // const handleDeleteBlogger = async (id) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/admin/blogger/delete/${id}`, {
    //             method: 'DELETE',
    //             credentials: 'include',
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to delete blogger');
    //         }
    //         await fetchBloggers();
    //         setShowDeleteConfirmation(false);
    //     } catch (error) {
    //         console.error('Error deleting blogger:', error);
    //     }
    // };

    const renderDeleteConfirmation = () => {
        return (
            <div className="delete-confirmation">
                <p>Are you sure you want to delete this category?</p>
                <button onClick={() => handleDeleteCategory(editCategory._id)}>Yes, Delete</button>
                {/* <p>Are you sure you want to delete this guest?</p>
                <button onClick={() => handleDeleteGuest(editGuest._id)}>Yes, Delete</button>
                <p>Are you sure you want to delete this blogger?</p>
                <button onClick={() => handleDeleteBlogger(editBlogger._id)}>Yes, Delete</button> */}
                <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
            </div>
        );
    };

    const renderEditCategoryTab = () => {
        return (
            <div>
                <h2>Edit Category</h2>
                <input
                    type="text"
                    value={editCategory.name}
                    onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                />
                <button onClick={handleEditCategory}>Edit Category</button>
            </div>
        );
    };

    const renderCategoryList = () => {
        return (
            <div className="category-container">
                <h2>Categories</h2>
                {categories.length === 0 && <p>No category, please add</p>}
                <div className="add-category">
                    <h3>Add Category</h3>
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Enter category"
                    />
                    <button onClick={handleAddCategory}>Add Category</button>
                </div>
                {categories.length > 0 && (
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <tr key={category._id}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditCategory({ _id: category._id, name: category.name });
                                            setShowEditCategoryTab(true);
                                        }}>Edit</button>
                                        <button onClick={() => {
                                            setShowDeleteConfirmation(true);
                                            setEditCategory({ _id: category._id, name: category.name });
                                        }}>Delete Category</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };

    const renderEditGuestTab = () => {
        const formatDate = (dateString) => {
            return dateString.split('T')[0]; // Cắt bớt chuỗi ngày tháng năm từ chuỗi đầu vào
        };
        return (
            <div>
                <h2>Edit Guest</h2>
                <input
                    type="text"
                    value={editGuest.name}
                    onChange={(e) => setEditGuest({ ...editGuest, name: e.target.value })}
                    style={{ width: '200px' }}
                />
                <input
                    type="date"
                    value={formatDate(editGuest.dob)}
                    onChange={(e) => setEditGuest({ ...editGuest, dob: e.target.value })}
                    style={{ width: '200px' }}
                />
                <select
                    value={editGuest.gender}
                    onChange={(e) => setEditGuest({ ...editGuest, gender: e.target.value })}
                    style={{ width: '200px' }}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    value={editGuest.address}
                    onChange={(e) => setEditGuest({ ...editGuest, address: e.target.value })}
                />
                <button onClick={handleEditGuest}>Edit Guest</button>
            </div>
        );
    };

    const renderGuestList = () => {
        const formatDate = (dateString) => {
            return dateString.split('T')[0]; // Cắt bớt chuỗi ngày tháng năm từ chuỗi đầu vào
        };
    
        return (
            <div className="guest-container">
                <h2>Guests</h2>
                {guests.length === 0 && <p>No guests, please add</p>}
                <div className="add-guest">
                    <h3>Add Guest</h3>
                    <input
                        type="text"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Enter name"
                        style={{ width: '200px' }}
                    />
                    <input
                        type="date"
                        value={formatDate(newGuest.dob)}
                        onChange={(e) => setNewGuest({ ...newGuest, dob: e.target.value })}
                        placeholder="Select date of birth"
                        style={{ width: '200px' }}
                    />
                    <select
                        value={newGuest.gender}
                        onChange={(e) => setNewGuest({ ...newGuest, gender: e.target.value })}
                        style={{ width: '200px' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input
                        type="text"
                        value={newGuest.address}
                        onChange={(e) => setNewGuest({ ...newGuest, address: e.target.value })}
                        placeholder="Enter address"
                    />
                    <input
                        type="text"
                        value={newGuest.email}
                        onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                        placeholder="Enter email"
                    />
                    <input
                        type="text"
                        value={newGuest.password}
                        onChange={(e) => setNewGuest({ ...newGuest, password: e.target.value })}
                        placeholder="Enter password"
                    />
                    <button onClick={handleAddGuest}>Add Guest</button>
                </div>
                {guests.length > 0 && (
                    <table className="guest-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guests.map(guest => (
                                <tr key={guest._id}>
                                    <td>{guest._id}</td>
                                    <td>{guest.name}</td>
                                    <td>{formatDate(guest.dob)}</td>
                                    <td>{guest.gender}</td>
                                    <td>{guest.address}</td>
                                    <td>{guest.account.email}</td>
                                    <td>
                                        <button onClick={() => {
                                            setEditGuest({ _id: guest._id, ...guest });
                                            setShowEditGuestTab(true);
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };
    
    const renderEditBloogerTab = () => {
        const formatDate = (dateString) => {
            return dateString.split('T')[0]; // Cắt bớt chuỗi ngày tháng năm từ chuỗi đầu vào
        };
        return (
            <div>
                <h2>Edit Blogger</h2>
                <input
                    type="text"
                    value={editBlogger.name}
                    onChange={(e) => setEditBlogger({ ...editBlogger, name: e.target.value })}
                    style={{ width: '200px' }}
                />
                <input
                    type="date"
                    value={formatDate(editBlogger.dob)}
                    onChange={(e) => setEditBlogger({ ...editBlogger, dob: e.target.value })}
                    style={{ width: '200px' }}
                />
                <select
                    value={editBlogger.gender}
                    onChange={(e) => setEditBlogger({ ...editBlogger, gender: e.target.value })}
                    style={{ width: '200px' }}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    value={editBlogger.address}
                    onChange={(e) => setEditBlogger({ ...editBlogger, address: e.target.value })}
                />
                
                <button onClick={handleEditBlogger}>Edit Guest</button>
            </div>
        );
    };

    const renderBloggerList = () => {
        const formatDate = (dateString) => {
            return dateString.split('T')[0]; // Cắt bớt chuỗi ngày tháng năm từ chuỗi đầu vào
        };
    
        return (
            <div className="blogger-container">
                <h2>Bloggers</h2>
                {bloggers.length === 0 && <p>No bloggers, please add</p>}
                <div className="add-blogger">
                    <h3>Add Blogger</h3>
                    <input
                        type="text"
                        value={newBlogger.name}
                        onChange={(e) => setNewBlogger({ ...newBlogger, name: e.target.value })}
                        placeholder="Enter name"
                        style={{ width: '200px' }}
                    />
                    <input
                        type="date"
                        value={formatDate(newBlogger.dob)}
                        onChange={(e) => setNewBlogger({ ...newBlogger, dob: e.target.value })}
                        placeholder="Select date of birth"
                        style={{ width: '200px' }}
                    />
                    <select
                        value={newBlogger.gender}
                        onChange={(e) => setNewBlogger({ ...newBlogger, gender: e.target.value })}
                        style={{ width: '200px' }}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input
                        type="text"
                        value={newBlogger.address}
                        onChange={(e) => setNewBlogger({ ...newBlogger, address: e.target.value })}
                        placeholder="Enter address"
                    />
                    {/* <input
                        type="file"
                        onChange={(e) => handleImageChangeBlogger(e)}
                    /> */}
                    <input
                        type="text"
                        value={newBlogger.email}
                        onChange={(e) => setNewBlogger({ ...newBlogger, email: e.target.value })}
                        placeholder="Enter email"
                    />
                    <input
                        type="text"
                        value={newBlogger.password}
                        onChange={(e) => setNewBlogger({ ...newBlogger, password: e.target.value })}
                        placeholder="Enter password"
                    />
                    <button onClick={handleAddBlogger}>Add Blogger</button>
                </div>
                {bloggers.length > 0 && (
                    <table className="blogger-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Address</th>
                                <th>Email</th>
                                {/* <th>Password</th> */}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloggers.map(blogger => (
                                <tr key={blogger._id}>
                                    <td>{blogger._id}</td>
                                    <td>{blogger.name}</td>
                                    <td>{formatDate(blogger.dob)}</td>
                                    <td>{blogger.gender}</td>
                                    <td>{blogger.address}</td>
                                    <td>{blogger.account.email}</td>
                                    {/* <td>{blogger.account.password}</td> */}
                                    {/* Render other blogger details */}
                                    <td className="action-buttons">
                                        <button onClick={() => {
                                            setEditBlogger({ _id: blogger._id, ...blogger });
                                            setShowEditBloggerTab(true);
                                        }}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };
    

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the list of selected files
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setNewGuest({ ...newGuest, image: imageUrl }); // Save the image URL to the new guest state
        }
    };

    const handleImageChangeBlogger = (e) => {
        const file = e.target.files[0]; // Get the first file from the list of selected files
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the file
            setNewBlogger({ ...newBlogger, image: imageUrl }); // Save the image URL to the new blogger state
        }
    };

    

    const renderSidebar = () => {
        return (
            <div className="admin-sidebar">
                <button onClick={() => setSidebarItem('category')}>Category</button>
                <button onClick={() => setSidebarItem('guest')}>Guest</button>
                <button onClick={() => setSidebarItem('blogger')}>Blogger</button>
            </div>
        );
    };

    return (
        <div className="admin-container">
            {renderSidebar()}
            <div className="content">
                {sidebarItem === 'category' && renderCategoryList()}
                {sidebarItem === 'guest' && renderGuestList()}
                {sidebarItem === 'blogger' && renderBloggerList()}
                {showDeleteConfirmation && renderDeleteConfirmation()}
                {showEditCategoryTab && renderEditCategoryTab()}
                {showEditGuestTab && renderEditGuestTab()}
                {showEditBloggerTab && renderEditBloogerTab()}
            </div>
        </div>
    );
}
