import Link from 'next/link'

const AccountLinks = () => {
  return (
    <div className="flex gap-4 x">
      <Link className="linkButton" href="/login">Log in</Link>
      <Link className="linkButton" href="/signup">SignUp</Link> 
    </div>
  )
}

export default AccountLinks