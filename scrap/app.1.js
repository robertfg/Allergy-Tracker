// Fetch data from the API (server)
getUsers = () => {
  return fetch('/admin')
    .then(response => response.json())
    .then(users => {
      return users;
    })
    .catch(error => console.error("GET USERS:", error));
}

// Render a list of users
renderUsers = users => {
  const listItems = users.map(user => `
    <li class="list-group-item">
      <strong>${user.userName}</strong>, ${user.firstName} ${user.lastName}, ${user.email}
      <span class="pull-right">
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteUserClick(this)" data-userId="${user._id}">Delete</button>
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
    userName:  data.userName || '',
    firstName: data.firstName || '',
    lastName:  data.lastName || '',
    email:     data.email || '',
    password:  data.password || '',
    _id:       data._id || ''
  };

  // Set values
  $('#userName').val(user.userName),
  $('#firstName').val(user.firstName),
  $('#lastName').val(user.lastName),
  $('#email').val(user.email)
  $('#password').val(user.password)
  $('#userid').val(user._id)

  // Change legend
  if (user._id) {
    $('#form-label').text("Edit your profile information:");
  } else {
    $('#form-label').text("Enter your registration information:");
  }
}

// Toggle deleted field
toggleDeleted = userId => {
  // Set the url for the user to delete
  const url = '/admin/' + userId;

  // Delete the user by "fetching" the DELETE route.
  fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(response => {
    // refreshUserList();
    fetch('/admin');
    // .then(response => response.json())
    // .then(users => {
    //   return users;
    // })
    // .catch(error => console.error("GET USERS:", error));
  })
  .catch(err => {
    console.error("Inability to toggle value of deleted field!", err);
  });
}

// Delete a user
deleteUser = userId => {
  // Set the url for the user to delete
  const url = '/admin/' + userId;  
  
  // Delete the user by "fetching" the DELETE route.
  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(response => {
    // refreshUserList();
    fetch('/admin');
    // .then(response => response.json())
    // .then(users => {
    //   return users;
    // })
    // .catch(error => console.error("GET USERS:", error));
  })
  .catch(err => {
    console.error("I'm not dead yet!", err);
  });
}

/*  **********  BUTTON CLICK HANDLERS  **********  */

// Submit: add or update
submitUserForm = () => {
  
  const userData = {
    userName:   $('#userName').val(),
    firstName:  $('#firstName').val(),
    lastName:   $('#lastName').val(),
    email:      $('#email').val(),
    password:   $('#password').val(),
    _id:        $('#userid').val()
  };

  // Validate
  if ( userData.userName  === ''  ||
       userData.firstName === ''  ||
       userData.lastName  === ''  ||
       userData.email     === ''  ||
       userData.password  === ''  ) {
    alert("You must complete all fields!");
    setForm();
    return;
    }

  // Are we updating (PUT) or creating (POST) users?
  let method, url;
  if (userData._id) {
    method = 'PUT';
    // url = '/profile/' + userData._id;
    url = '/profile/' + userData.userName;
  } else {
    method = 'POST';
    url = '/signup/user';
  }

  // Update or Create:
  fetch(url, {
    method:  method,
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(user => {
    setForm();
    // refreshUserList();
  })
  .catch(err => {
    console.error("A terrible thing has happened", err);
  }) 
}

// Cancel
clearUserForm = () => setForm();

// Edit
handleEditUserClick = element => {
  const userId = element.getAttribute('data-userId');
  const user = window.userList.find(user => user._id === userId);
  if (user) {
    setForm(user);
  }
}

// Toggle Deleted status
handleToggleClick = element => {
  const userId = element.getAttribute('data-userId');
  
  if ( confirm("Are you sure?") ) {
    toggleDeleted(userId);
  }
}

// Delete
handleDeleteUserClick = element => {
  const userId = element.getAttribute('data-userId');

  if ( confirm("Are you sure?") ) {
    deleteUser(userId);
  }
}
