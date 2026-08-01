import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerDetails } from "../Utils/api";

export const customerDetailsApiCall = createAsyncThunk("customerJourneyDetails/customerDetailsApiCall", async (params) => {
    try {
        const response = await getCustomerDetails(params);
       
        return response;
    } catch (e) {
        throw new Error("Error fetching customer data" + e.message);
    }

});

const initialState = {
    customerDetails: {},
    journeySteps: {
        check_eligibility: 0,
        loan_quote: 0,
        personal_details: 0,
        employment_details: 0,
        upload_documents: 0,
        aadhaar_upload: 0,
        pan_upload: 0,
        pay_slip_upload: 0,
        bank_statement_upload: 0,
        residence_proof_upload: 0,
        banking_details: 0,
        thank_you: 0
    },
    click_id:'',
    error: null
};

export const customerJourneyDetailsSlice = createSlice({
    name: 'customerJourneyDetails',
    initialState,
    reducers: {
        updateJourneyEvents: (state, action) => {
            state.journeySteps = { ...state.journeySteps, ...action.payload };
        },
        updateCustomerDetails: (state, action) => {
            state.customerDetails = { ...state.customerDetails, ...action.payload };
        },

        updateClickId: (state, action) => {
      state.click_id = action.payload;
    },
    },
    extraReducers: (builder) => {
        builder
            .addCase(customerDetailsApiCall.pending, (state) => {
                state.error = null;
            })
            .addCase(customerDetailsApiCall.fulfilled, (state, action) => {
                state.customerDetails = { ...state.customerDetails, ...action?.payload?.data?.customer_details };
                state.journeySteps = { ...state.journeySteps, ...action?.payload?.data?.screen_details };
            })
            .addCase(customerDetailsApiCall.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase("LOGOUT", () => initialState);
    }
});

export const customerJourneyDetailsReducer = customerJourneyDetailsSlice.reducer;
export const { updateJourneyEvents, updateCustomerDetails,updateClickId } = customerJourneyDetailsSlice.actions;

