type Inquiry = {
    text : string;
    requiresAction : boolean;
};

function printInquiry(inquiry : Inquiry): void{
    console.log("문의 : " , inquiry.text);
    console.log("후속 조치 필요 : ", inquiry.requiresAction);
};

const inquiry : Inquiry ={
    text : "다음 주로 예약을 변경하고 싶습니다.",
    requiresAction : true,
};

printInquiry(inquiry);