// Fetch data from the API (server)
getUsers = () => {
  return fetch('/api/user')
    .then(response => response.json())
    .then(users => {
      console.log("Users:", users);
      return users;
    })
    .catch(error => console.error("GET USERS:", error));
}

// Render a list of users
renderUsers = (users) => {
  const listItems = users.map(user => `
    <li class="list-group-item">
      <strong>${user.title}</strong> - ${user.description}
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;
  return html;
}

// Fetch users from the API and render to the page: tie getUsers and renderUsers together
refreshUserList = () => {
  getUsers()
  .then(users => {
    const html = renderUsers(users);
    $('#list-container').html(html);
  });
}
