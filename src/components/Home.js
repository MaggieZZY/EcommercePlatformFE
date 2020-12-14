import React from 'react';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";

const categories = [
    {
        categoryId: 1,
        name: 'Sofa',
        image: "https://www.ikea.com/images/holmsund-light-blue-corner-sofa-bed-easily-transforms-into-a-69ca4fe4dc512d48ce1cca39d4a24000.jpg?f=xxxl"
    },
    {
        categoryId: 2,
        name: 'Table and Chair',
        image: "https://www.westelm.com/weimgs/ab/images/wcm/products/201922/0183/lena-mid-century-dining-table-c.jpg"
    },
    {
        categoryId: 3,
        name: 'Bed',
        image: "https://images.crateandbarrel.com/is/image/Crate/cb_dCT_20190801_BedroomFurn?wid=1278&qlt=75"
    },
    {
        categoryId: 4,
        name: 'Closet',
        image: "https://ak1.ostkcdn.com/images/products/14427354/Cielo-by-Bestar-Classic-Corner-Walk-In-Closet-ed5da0cd-92ed-400e-996c-7ef796e9529e.jpg"
    },
    {
        categoryId: 5,
        name: 'Kitchen',
        image: "https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2018/10/29/3/dh2019_kitchen-01-wide-KB2A9062_h.jpg.rend.hgtvcom.966.644.suffix/1540825725398.jpeg"
    },
    {
        categoryId: 6,
        name: 'Bath',
        image: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/8314cabd-99f8-4300-bf2b-c8a1bea9b133-bathroom-design-mistakes-intro.jpg"
    },
    {
        categoryId: 7,
        name: 'TV',
        image: "https://5.imimg.com/data5/MK/QK/MY-29676757/led-tv-stand-500x500.jpeg"
    },

]
export function Home() {
    const background = "https://images.unsplash.com/photo-1491926626787-62db157af940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";
    return(
        
        <main role="main">
            <section className="jumbotron text-center" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
                <div className="container">
                    <h1 className="jumbotron-heading">Find Our Best Deals</h1>
                    <p className="lead text-muted">Up to 60% Sales Modern Furniture</p>
                    <Link to="/products/sales">
                        Check for Sales and Clearance
                    </Link>
                </div>
            </section>


            <div className="root">
                <GridList className="gridList" cellHeight={500} spacing={20} cols={4}>

                    {
                        categories.map(c => (
                            <GridListTile className="grid">
                                <img src={c.image} alt={c.name} />
                                <GridListTileBar
                                    style={{backgroundColor: "#cedfed"}}
                                    title={<Link to={`/products/category/${c.categoryId}`}>{c.name}</Link>}
                                    actionIcon={
                                        <IconButton aria-label="Details" className="icon">
                                            {/*<InfoIcon />*/}
                                        </IconButton>
                                    }
                                />
                            </GridListTile>


                        ))
                    }



                </GridList>
            </div>

        </main>

    );
}

