export default function Footer() {
	return (
		<footer style={{ textAlign: "center", color: "grey" }}>
			<hr />
			<h4>
				Simple single page Todo App integrated with Firebase realtime database,
				written in React with async Context API & useReducer Redux-like state
				management pattern implemented created by{" "}
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
					href="https://github.com/vadimgierko/async-redux-like-state-management-pattern-in-react#readme"
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
					href="https://codesandbox.io/s/async-react-context-usereducer-redux-like-state-management-pattern-nfiffe"
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
					href="https://github.com/vadimgierko/async-redux-like-state-management-pattern-in-react"
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
