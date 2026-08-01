// PaymentModal.js
import './PaymentModal.css'; // Keep the existing CSS
import payU from '../../images/payu.webp'
import paytm from '../../images/paytm.png'

const PaymentModal = ({ onClose, onPayu, onPaytm, isLoading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content payment-popup">
        <h3>Choose Payment Method</h3>
        <div className="modal-actions" style={{display:"flex",justifyContent:"center"}}>
          <img
            src={paytm}
            alt="Pay with Paytm"
            className="pay-image paytm-image"
            onClick={onPaytm}
            style={{width:"20%",marginRight:"30px", cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }}
          />
          <img
            src={payU}
            alt="Pay with PayU"
            className="pay-image payu-image"
            onClick={onPayu}
            style={{width:"14%", cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }}
          />
        </div>
        <button
            className=" btn btn-secondary mx-auto px-5 btn-lg "
            onClick={onClose}
          >
            Cancel
        </button>
      </div>
      </div>
  );
};

export default PaymentModal;