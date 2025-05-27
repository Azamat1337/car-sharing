import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
    success: false,
};

export const CLOSE_CONVERSATION = 'close_conversation';

const closeConversationSlice = createSlice({
    name: CLOSE_CONVERSATION,
    initialState,
    reducers: {
        closeConversationRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        closeConversationSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        closeConversationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        closeConversationReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    selectors: {
        closeConversationLoadingSelector: (state) => state.loading,
        closeConversationErrorSelector: (state) => state.error,
        closeConversationSuccessSelector: (state) => state.success,
    }
});

export const {
    closeConversationRequest,
    closeConversationSuccess,
    closeConversationFailure,
    closeConversationReset
} = closeConversationSlice.actions;

export const {
    closeConversationLoadingSelector,
    closeConversationErrorSelector,
    closeConversationSuccessSelector
} = closeConversationSlice.selectors;

export default closeConversationSlice.reducer;