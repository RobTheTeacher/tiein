import Image from 'next/image'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div className="p-24 ">
      <h1>Tie In</h1>
      <div className="flex gap-6 mb-6">
        <div className="w-1/2">
          <p className="mb-6">Tie in was made in response to being sick of finding out
            about community events, markets, gallery openings etc,
            four days after they happen.</p>

          <p className="mb-6">This site has no ads and is an alternative to for-profit
            social media sites.</p>

          <p>It:</p>
          <div className="pl-6 mb-6">

            <p>&#x2022; aims to connect individuals to community groups,
              small businesses, galleries and local events</p>

            <p>&#x2022; centring getting out of the house and going to things
              in your community!</p>

            <p>&#x2022; has no ads, no monetary incentivisation and no
              investments in dodgy places!</p>
          </div>
        </div>
        <div className="w-1/2">
          <img className="w-full h-auto " src="/logo.png" alt="tiein logo" />
        </div>
      </div>
      <div className="text-center">Tie in was designed on Wurundjeri Country by Alex and written in Sweden by his uncle Rob!</div>
      <Link className="block text-2xl text-center m-4" href="/faqs">FAQs &#8594;</Link>
    </div>
  )
}

export default AboutPage