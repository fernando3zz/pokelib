import PropTypes from 'prop-types';

const Modal = ({ alias, setAlias, handleSaveAlias, setIsModalOpen }) => (
  <div className=" backdrop-blur-sm fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="  bg-white p-8 rounded-md shadow-md   w-full max-w-md mx-4 md:w-1/3 ">
      <h2 className="text-2xl font-semibold mb-4">Save Pokemon Alias</h2>
      <input 
        type="text"
        placeholder="Enter alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        className=" border p-2 rounded-md w-full mb-4"
      />
      <div className="flex justify-end space-x-2">
        <button 
          className="py-2 px-3 bg-gray-400 text-white font-medium rounded-md hover:bg-gray-500"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <button 
          className="py-2 px-3 bg-sky-400 text-white font-medium rounded-md hover:bg-sky-500"
          onClick={handleSaveAlias}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  alias: PropTypes.string.isRequired,
  setAlias: PropTypes.func.isRequired,
  handleSaveAlias: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
};

export default Modal;
