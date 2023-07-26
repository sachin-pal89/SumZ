import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex flex-col justify-center items-center'>
      <nav className='w-full flex justify-between items-center m-5 pt-2'>
        <img src={logo} alt="Sumz logo" className='w-28 object-contain'/>

        <button
          type='button'
          className='black_btn'
          onClick={() => window.open('https://github.com/sachin-pal89/SumZ', '_blank')}
        >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Article with <br className='max-md:hidden'/>
        <span className='orange_gradient'>Open AI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero