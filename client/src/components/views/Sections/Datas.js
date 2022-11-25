 //상품분류 array로 정의(1depth)
 const productItem1 = [
    {key : 1, value : '아우터'},
    {key : 2, value : '상의'},
    {key : 3, value : '팬츠'},
    {key : 4, value : '스커트/원피스'},
    {key : 5, value : '신발'},
    {key : 6, value : '악세사리'}
]

//상품분류 array로 정의(2depth)
const productItem2 = [
    [
        {key : 1, value : '코트'},
        {key : 2, value : '가디건'},
        {key : 3, value : '자켓'},
        {key : 4, value : '패딩'}
    ],
    [
        {key : 1, value : '반소매티셔츠'},
        {key : 2, value : '긴소매티셔츠'},
        {key : 3, value : '셔츠'},
        {key : 4, value : '민소매'},
        {key : 5, value : '니트'},
        {key : 6, value : '후드/맨투맨'}
    ],
    [
        {key : 1, value : '롱팬츠'},
        {key : 2, value : '숏팬츠'},
        {key : 3, value : '슬랙스'},
        {key : 4, value : '데님'},
        {key : 5, value : '와이드팬츠'}
    ],
    [
        {key : 1, value : '미니스커트'},
        {key : 2, value : '롱스커트'},
        {key : 3, value : '미니원피스'},
        {key : 4, value : '롱원피스'},
        {key : 5, value : '투피스'}
    ],
    [
        {key : 1, value : '블로퍼/뮬'},
        {key : 2, value : '플랫/로퍼'},
        {key : 3, value : '샌들'},
        {key : 4, value : '스니커즈'},
        {key : 5, value : '슬리퍼/쪼리'},
        {key : 6, value : '힐'},
        {key : 7, value : '워커/부츠'}
    ],
    [
        {key : 1, value : '목걸이'},
        {key : 2, value : '귀걸이'},
        {key : 3, value : '팔찌/발찌'},
        {key : 4, value : '반지'}
    ]

]

export {
    productItem1,
    productItem2
}