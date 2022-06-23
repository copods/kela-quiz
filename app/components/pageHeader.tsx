import AddButton from "./AddButton";
import HeaderText from "./headerText";

export default function PageHeader(){
    let heading: string = 'Members';
    let label: string = '+ Add Member';


    return(
        <div>
            <div className="flex justify-between items-center">
                <HeaderText  heading={heading} />
                <AddButton  label={label} />
            </div>
          
        </div>
    )
}