import NedalIcon from "@/components/Icons/Medal Icon";
import {Button} from "@/components/ui/button";
import Link from 'next/link'

const MarketingPage = () => {

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center flex-col'>
                <div
                    className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
                    <span><NedalIcon fontSize={30}/></span>
                    <span>{"מס' 1 בניהול משימות"}</span>
                </div>
                <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
                    ניהול המשימות עוזר לצוות
                </h1>
                <span
                    className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    לעבוד יעיל יותר.
                </span>
            </div>
            <div className='mt-4 max-w-xs md:max-w-2xl mx-auto'>
                <span className='text-sm md:text-xl text-neutral-400 text-center'>
                 שתפו פעולה, נהל פרויקטים והגעה לפסגות פרודוקטיביות חדשות. ממגדלים גבוהים ועד למשרד הביתי, הדרך שבה הצוות שלך עובד היא ייחודית - השג את הכל עם מנהל המשימות.
                </span>
            </div>
            <Button className='mt-6' size='lg'>
                <Link href='/sign-in'>הכנס למנהל המשימות</Link>
            </Button>
        </div>
    )
}
export default MarketingPage
