import { Icon } from "@iconify/react"
import { useUser } from "~/utils";
import { Form } from "@remix-run/react";
function Footer() {
    const user = useUser()
    return (
        <div>
            <hr className="border-gray-300 border border-solid mb-3 mt-3"></hr>
            <div className="flex items-center gap-1 justify-between">

                <div className="w-10 h-10 bg-primary rounded-full flex justify-center items-center">
                    <span className="text-white text-lg leading-7 font-medium">{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}</span>
                </div>

                <div className="flex-col gap-2">
                    <p className="text-xs leading-4 font-semibold text-gray-900 truncate w-32">{user.firstName} {user.lastName}</p>
                    <p className="text-xs leading-4 font-normal text-gray-500 truncate w-32">{ user.email }</p>
                </div>

                
                <Form action="/logout" method="post">
                    <button type="submit" className="w-10 h-10 bg-red-500 rounded-lg items-center flex justify-center">
                        <Icon icon="mdi:logout-variant" className="absolute text-gray-50 w-5 h-5"></Icon>
                    </button>
                </Form>
            </div>
        </div>
    );
}

export default Footer;