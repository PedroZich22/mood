

const Icon =({iconName}) => { return (
    <svg className='lucide-icon'>
        <use href={`#${iconName}`} />
    </svg>)

}

export default Icon;