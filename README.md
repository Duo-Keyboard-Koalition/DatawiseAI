# Engeneering Notebook 4/8/2025
Okay, here's a step-by-step approach to compare two specific documents and extract pairs of words or terms that have similar semantic meanings within their respective contexts:

**Goal:** Identify pairs `(term_from_doc_A, term_from_doc_B)` where the terms have similar meanings.

**Assumptions:** You have the content of the two documents (let's call them Document A and Document B) accessible as text.

**Approach:**

1.  **Term Extraction (for each document):**
    * **Define Scope:** Decide what constitutes a "term" you want to compare. This could be:
        * Individual important words (e.g., nouns, verbs - requires part-of-speech tagging).
        * Key phrases or N-grams (e.g., "customer acquisition cost", "data traceability").
        * Column headers (if the documents contain tables).
        * Section titles or headings.
    * **Extract:** Process Document A and extract a list of relevant terms based on your chosen scope. Keep track of their context (e.g., the sentence or paragraph they came from). Do the same for Document B.
        * *Example Tooling:* Python libraries like `NLTK`, `spaCy` for text processing, keyword extraction libraries like `KeyBERT` or `YAKE`. If dealing with tables, libraries like `pandas`.

2.  **Embedding Generation (for all extracted terms):**
    * **Choose Model:** Select a sentence transformer or general embedding model (e.g., `all-MiniLM-L6-v2`, `all-mpnet-base-v2` from Hugging Face/Sentence-Transformers, or OpenAI's embedding models).
    * **Embed:** Generate an embedding vector for *every* term you extracted from Document A and *every* term you extracted from Document B. Store these vectors along with the original term text and its source (Doc A or Doc B).

3.  **Pairwise Similarity Calculation:**
    * **Compare Across Documents:** The core step is to compare each term from Document A against *every* term from Document B.
    * **Calculate Cosine Similarity:** For each pair `(term_A_i, term_B_j)`, calculate the cosine similarity between their respective embedding vectors `vector_A_i` and `vector_B_j`.
        * *Example Tooling:* `sklearn.metrics.pairwise.cosine_similarity` or similar functions in `numpy`/`scipy`.

4.  **Filtering Based on Threshold:**
    * **Set Threshold:** Define a minimum cosine similarity score that signifies "similar enough" for your needs (e.g., 0.75, 0.8, 0.85 - this often requires experimentation).
    * **Filter:** Keep only those pairs `(term_A_i, term_B_j)` where their calculated similarity score exceeds your chosen threshold.

5.  **Output the Similar Pairs:**
    * The result is a list of pairs of terms, one from each document, that are considered semantically similar based on your threshold.
    * *Example Output:*
        ```
        [
          ("data traceability", "lineage tracking", 0.88),
          ("due diligence", "deal assessment", 0.82),
          ("naming conventions", "field labeling standards", 0.91),
          ...
        ]
        ```
        (Where the first term is from Doc A, the second from Doc B, and the third is the similarity score).

**Optional Refinements:**

* **Contextual Verification:** For the pairs identified above the threshold, you could use a more powerful LLM (like GPT-4, Claude, Gemini) to look at the original sentences/paragraphs where `term_A_i` and `term_B_j` appeared. Ask the LLM if they are being used with the same meaning in those specific contexts. This helps eliminate false positives where words are similar generally but used differently in the documents.
* **Focus on Specific Parts of Speech:** You might filter the extracted terms to only include nouns or noun phrases if those are the primary concepts you care about comparing.

This process provides a systematic way to leverage semantic embeddings to find corresponding concepts across two different documents, even when the exact wording differs.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

