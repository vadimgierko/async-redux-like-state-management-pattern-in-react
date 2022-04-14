export default function Footer() {
	return (
		<footer style={{ textAlign: "center", color: "grey" }}>
			<hr />
			<h4>
				Todo App created with create-react-app with Redux-like state management
				pattern (React Context API + useReducer hook) implemented created by{" "}
				<a
					href="https://github.com/vadimgierko"
					target="_blank"
					rel="noreferrer"
				>
					Vadim Gierko
				</a>
				.
			</h4>
			<p>
				Click here to see the{" "}
				<a
					href="https://github.com/vadimgierko/redux-like-state-management-pattern#how-to-applyuse-redux-like-state-management-pattern-using-react-context-api--usereducer"
					target="_blank"
					rel="noreferrer"
				>
					step by step implementation guide
				</a>
				.
			</p>
			<p>
				Click here to{" "}
				<a
					href="https://codesandbox.io/s/redux-like-state-management-pattern-in-react-118eg"
					target="_blank"
					rel="noreferrer"
				>
					play with the code in codesandbox
				</a>
				.
			</p>
			<p>
				Click here to see the{" "}
				<a
					href="https://github.com/vadimgierko/redux-like-state-management-pattern"
					target="_blank"
					rel="noreferrer"
				>
					repository code on GitHub
				</a>
				.
			</p>
		</footer>
	);
}
