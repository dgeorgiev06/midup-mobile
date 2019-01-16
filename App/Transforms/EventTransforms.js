import Invitee from "../Services/dao/Invitee";

const transform = (event) => {

    const invitees = event.invitees.map((invitee) => 
        new Invitee(
            invitee._userProfileId, 
            invitee._userLogin,
            null,
            null,
            null,
            null,
            invitee._imageUrl,
            invitee.status))

    event.invitees = invitees        
    
    return event
    
}
  
// let's return back our create method as the default.
export default {
  transform
}