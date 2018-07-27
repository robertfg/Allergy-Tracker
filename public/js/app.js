// Fetch data from the API (server)
getUsers = () => {
  return fetch('/api/user')
    .then(response => response.json())
    .then(users => {
      return users;
    })
    .catch(error => console.error("Error getting users:", error));
}

// Render a list of users
renderUsers = users => {
  const contentContainer = users.map(user => `
    <div class="content">
      <div class="flex1">${user.lastName}</div>
      <div class="flex2">${user.firstName}</div>
      <div class="flex3">${user.email}</div>
      <div class="flex4">${user.deleted ? 'Inactive': 'Active'}</div>
      <div class="flex5">
        <button type="button" class="btn btn-xs btn-info" onclick="handleEditUserClick(this)" data-userId="${user._id}">Edit</button>
      </div>
      <div class="flex6">
        <button type="button" class="btn btn-xs btn-warning" onclick="handleToggleUserClick(this)" data-userId="${user._id}">Toggle Status</button>
      </div>
      <div class="flex7">
        <span class="pull-right">
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteUserClick(this)" data-userId="${user._id}">Delete</button>
      </div>
    </div>
    `);
  return contentContainer;
}

// Fetch users from the API and render to the page: tie getUsers and renderUsers together
refreshUserList = () => {
  getUsers()
  .then(users => {
    window.userList = users;
    const html = renderUsers(users);
    $('#content-container').html(html);
  });
}

// Clear/populate the form
setForm = ( data={} ) => {
  const user = {
    firstName: data.firstName || '',
    lastName:  data.lastName  || '',
    email:     data.email     || '',
    _id:       data._id       || ''
  };

  // Set values
  $('#user-firstName').val(user.firstName),
  $('#user-lastName').val(user.lastName),
  $('#user-email').val(user.email)
  $('#user-id').val(user._id)

  // Change legend
  if (user._id) {
    $('#form-label').text("Edit User");
  } else {
    $('#form-label').text("Add User");
  }
}

// Toggle user status
toggleUser = userId => {
  // Set the url for the user to delete
  const url = '/api/toggle/user/' + userId;

  // Toggle the active/inactive status.
  fetch(url, {
    method:   'PUT',
    headers:  { 'Content-Type': 'application/json' },
  })
  .then(response => response.json())
  .then(response => {
    refreshUserList();
  })
  .catch(err => {
    console.error("Unable to toggle the user's status.", err);
  });
}

// Delete a user
deleteUser = userId => {
  // Set the url for the user to delete
  const url = '/api/user/' + userId;

  // Delete the user by "fetching" the DELETE route.
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(response => {
    refreshUserList();
  })
  .catch(err => {
    console.error("Unable to delete the user.", err);
  });
}


/*  **********  BUTTON CLICK HANDLERS  **********  */

// Submit: add or update
submitUserForm = () => {
  const userData = {
    firstName:  $('#user-firstName').val(),
    lastName:   $('#user-lastName').val(),
    email:      $('#user-email').val(),
    _id:        $('#user-id').val()
  };

  // Validate
  if ( userData.firstName === ''  ||  userData.lastName ===  ''  || userData.email === '' ) {
    alert("You must complete all fields!");
    setForm();
    return;
    }

  // Are we updating (PUT) or creating (POST) users?
  let method, url;
  if (userData._id) {
    method = 'PUT';
    url = '/api/user/' + userData._id;
  } else {
    method = 'POST';
    url = '/api/user';
  }

  // Update or Create:
  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(user => {
    setForm();
    refreshUserList();
  })
  .catch(err => {
    console.error("A terrible thing has happened", err);
  }) 
}

// Cancel
cancelUserForm = () => setForm();

// Edit
handleEditUserClick = element => {
  const userId = element.getAttribute('data-userId');
  const user = window.userList.find(user => user._id === userId);
  if (user) {
    setForm(user);
  }
}

// Toggle status
handleToggleUserClick = element => {
  const userId = element.getAttribute('data-userId');
  if ( confirm("Are you sure?") ) {
    toggleUser(userId);
  }
}

// Delete
handleDeleteUserClick = element => {
  const userId = element.getAttribute('data-userId');
  if ( confirm("Are you sure?") ) {
    deleteUser(userId);
  }
}
