import FAQ from "./faq.index"

const faqs = [
  {
    question: "What is all the terminology/words used on here?",
    answer: 
    [
      "• Thread - event invite",
      "• Ties - other users",
      "• Tie ins - Other people’s events that you have attended/will attend that are saved to your profile",
      "• My threads - thread a user has created"
    ]
  },
  {
    question: "How do I make a thread?",
    answer: [
      "Create an account or log in",
      "Select 'Create a Tie' from the header",
      "Threads are made similar by uploading an image, writing a description and title and clicking post!",
      "In future we would love to incorporate a design studio to make cool invites but until then, get creative, snap some shots and upload!"
    ]
  }
]

const FAQs = () => {
  return (
    <div>
      {faqs && faqs.map((faq, index) => <FAQ {...faq} />)}
    </div>
  )
}

export default FAQs