import Feed from '../components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
          <h1 className='head_text text-center'>
              Discover & Share
              <br className = 'max-md:hidden' />
              <span className = 'orange_gradient text-center'> Inspiring Quotes</span>
          </h1>
          <p className = 'desc text-center'>
            QuoteVille is your one stop shop for all things quotes. Your daily dose of inspiration - create, share, and discover right here on QuoteVille! 
          </p>

          <Feed />
      </section>
  )
}

export default Home