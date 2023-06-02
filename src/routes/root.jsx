import { Outlet, useLoaderData } from "react-router-dom";
import { getCountries } from "../routes/listView"

export async function loader() {
    const countries = await getCountries();
    return { countries };
}

export default function Root() {
    const { countries } = useLoaderData();

    return (
        <>
            <header>
                <h1>Where in the world?</h1>
                <fieldset>
                    <label htmlFor="light"></label>
                    <input type="radio" name="theme" id="light" checked />
                    <label htmlFor="dark"></label>
                    <input type="radio" name="theme" id="dark" />
                </fieldset>
            </header>
            <main >
                <div id="detail">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
