import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProviderWrapper } from "./context/user.context";
import { PlaybarProviderWrapper } from "./context/player.context";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<QueryClientProvider client={queryClient}>
		<Router>
			<PlaybarProviderWrapper>
				<UserProviderWrapper>
					<App />
				</UserProviderWrapper>
			</PlaybarProviderWrapper>
		</Router>
	</QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
