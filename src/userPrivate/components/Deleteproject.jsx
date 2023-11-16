import axios from "axios";

const Deleteproject = ({ name,id,adminemail}) => {

  const offmodal = () => {
    let a = document.getElementById("deleteProject");
    a.classList.remove('is-active');
  }

  const onDelete = () => {
    axios(({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API}/api/deleteproject`,
      data: {id,Adminemail:adminemail }
    }))
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      });
  }

  return (
    <div className="modal" id="deleteProject">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="subtitle is-5">Are you sure you want to delete project: {name} ?</p>
        </header>
        <div className="modal-card">
          <section class="modal-card-body">
            <center>
              <button className="button is-danger mr-5" onClick={() => onDelete()}>Delete</button>
              <button className="button" onClick={offmodal}>Cancel</button>
            </center>
          </section>
        </div>

      </div>
    </div>
  )
}

export default Deleteproject;