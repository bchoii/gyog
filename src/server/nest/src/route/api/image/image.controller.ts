import { Controller, Get, Redirect } from '@nestjs/common';
import { uuid } from '../../../../../../../../main/src/utils';
import { ImageService } from './image.service';

@Controller('api/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('')
  @Redirect()
  async image() {
    return { url: `./${uuid()}` };
    // this.imageindex = (this.imageindex + 1) % this.imagearray.length;
    // const url = this.imagearray[this.imageindex];
    // const buffer = await (await fetch(url)).buffer();
    // response.type(extname(url));
    // response.end(buffer, 'binary');
  }

  @Get(':code')
  @Redirect()
  async image2() {
    this.imageindex = (this.imageindex + 1) % this.imagearray.length;
    return { url: this.imagearray[this.imageindex] };
  }

  // @Get('')
  // get(@Response() response) {
  //   response.type('.png');
  //   const image = this.imageService.getimage('');
  //   response.end(image, 'binary');
  // }

  // @Get(':code')
  // code(@Response() response, @Param('code') code) {
  //   response.type('.png');
  //   const image = this.imageService.getimage(code);
  //   response.end(image, 'binary');
  // }

  imageindex = -1;
  imagearray = [
    'https://images.unsplash.com/photo-1592419391068-9bd09dd58510?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1595755983637-2ae1a129c729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1534254608209-03b8f2c24397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1595755969397-5b2e8846dbad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1530836176759-510f58baebf4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1595755972749-75b01a9be481?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1595755973454-6f57c3ece624?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1558616743-a74619aa9ec8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1559294824-90be3c97141e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1558717738-12f5dde036a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1532509774891-141d37f25ae9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1543588906-0f97de562e31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1556130293-529d28ce262a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1532978678576-8e855616398d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1522579479806-486feddb6d25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1502865787650-3f8318917153?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1525328388884-545eeb6e2163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1527324546834-40c5d61f140f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1522223829476-5d8ce6672c46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1530860230002-bb67fbabe1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1542994740-3061a3455ae6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1522865389096-9e6e525333d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1507484467459-0c01be16726e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1530089391149-fb0f47b4d6bb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1494220394759-e0b232f883ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    'https://images.unsplash.com/photo-1523349312806-f5dde0a01c32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    'https://images.unsplash.com/photo-1530088643190-43528e6e154a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    // 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/372882/pexels-photo-372882.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=400',
    // 'https://cdn.pixabay.com/photo/2010/12/13/10/05/background-2277_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/01/31/09/30/raspberry-2023404_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/07/22/09/59/fruit-1534494_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/03/10/18/44/top-view-1248955_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/08/11/08/04/vegetables-1584999_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/03/23/15/00/ice-cream-cone-1274894_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2015/03/26/09/39/cupcakes-690040_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/04/13/07/18/blueberry-1326154_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/05/07/19/32/strawberry-2293337_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/05/24/13/29/olive-oil-1412361_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/05/31/13/01/raspberries-1426859_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberries-1330459_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/12/10/14/47/piza-3010062_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2016/01/05/13/58/apple-1122537_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2018/04/29/11/54/strawberries-3359755_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/09/22/19/05/casserole-dish-2776735_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2014/04/10/11/06/tomatoes-320860_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2017/12/29/16/34/fruit-3048001_1280.jpg',
    // 'https://cdn.pixabay.com/photo/2018/05/26/10/54/strawberries-3431122_1280.jpg',
  ];
}
