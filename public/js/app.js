// Fetch data from the API (server)
getUsers = () => {
  return fetch('/api/user')
    .then(response => response.json())
    .then(users => {
      return users;
    })
    .catch(error => console.error("GET USERS:", error));
}

// Render a list of users
renderUsers = (users) => {
  const listItems = users.map(user => `
    <li class="list-group-item">
      <strong>${user.lastName}</strong>, ${user.firstName}, ${user.email}
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditUserClick(this)"   data-userId="${user._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-danger"  onclick="handleDeleteUserClick(this)" data-userId="${user._id}">Del</button>
      </span>
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;
  return html;
}

// Fetch users from the API and render to the page: tie getUsers and renderUsers together
refreshUserList = () => {
  getUsers()
  .then(users => {
    window.userList = users;
    const html = renderUsers(users);
    $('#list-container').html(html);
  });
}

// Clear/populate the form
setForm = ( data={} ) => {
  const user = {
    firstName: data.firstName || '',
    lastName:  data.lastName || '',
    email:     data.email || '',
    _id:       data._id || ''
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

// Delete a user
deleteUser = (userId) => {
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
    console.error("I'm not dead yet!", err);
  });
}


/*  **********  BUTTON CLICK HANDLERS  **********  */

// Submit: add or update
submitUserForm = () => {
  const userData = {
    firstName: $('#user-firstName').val(),
    lastName: $('#user-lastName').val(),
    email: $('#user-email').val(),
    _id: $('#user-id').val()
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
handleEditUserClick = (element) => {
  const userId = element.getAttribute('data-userId');
  const user = window.userList.find(user => user._id === userId);
  if (user) {
    setForm(user);
  }
}

// Delete
handleDeleteUserClick = (element) => {
  const userId = element.getAttribute('data-userId');
  if ( confirm("Are you sure?") ) {
    deleteUser(userId);
  }
}
