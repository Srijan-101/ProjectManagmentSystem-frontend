

const Deleteproject = ({name}) => {

    const offmodal = () => {
        let a = document.getElementById("deleteProject");
        a.classList.remove('is-active');
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
          <button className="button is-danger mr-5">Delete</button>
          <button className="button" onClick={offmodal}>Cancel</button>
        </center>
        </section>  
      </div>

    </div>
  </div>
    )
}

export default Deleteproject;