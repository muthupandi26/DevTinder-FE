const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={user.photoUrl} alt="photo" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
        {user.age && <p>{user.age + ", " + user?.gender}</p>}
        <p>{user?.about || "About of the user!"}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
