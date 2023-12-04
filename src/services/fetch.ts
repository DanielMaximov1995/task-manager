'use server'
import bcrypt from "bcryptjs"
import {
    BoardModelType,
    CardModelType,
    ListModelType, LogModelType,
    ObjectIdType,
    OrganizationModelType,
    UserModelType,
} from "@/types/Schema"
import UserModel from "@/utils/Database/models/UserModel"
import LogModel from "@/utils/Database/models/LogModel"
import {PasswordEmailType} from "@/types/others";
import OrganizationModel from "../utils/Database/models/OrganizationModel";
import {getServerSession , Session } from "next-auth";
import { authOptions } from '@/utils/authOptions'
import BoardModel from "@/utils/Database/models/BoardModel";
import ListModel from "@/utils/Database/models/ListModel";
import CardModel from "@/utils/Database/models/CardModel";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const getUsers =  async () => {
    try {
        let data = await UserModel.find()
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getUserId =  async (id : string) => {
    try {
        let data = await UserModel.findById(id)
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewUser =  async (data : UserModelType) => {
    try {
        let emailExist = await UserModel.findOne({email : data.email.toLowerCase()})
        if(emailExist) {
            throw Error('אימייל זה קיים...')
        }

        let password = await bcrypt.hash(data.password, 10)

        const newUser = await UserModel.create({
            ...data,
            fullName : `${data.fName} ${data.lName}`,
            email : data.email.toLowerCase(),
            password
        });

        return JSON.parse(JSON.stringify({ newUser, message : 'ההרשמה בוצעה בהצלחה !' , success : true }))
    } catch (error) {
        throw error;
    }
}

export const updateUser = async (id : ObjectIdType , data: UserModelType) => {
    try {
        await UserModel.findOneAndUpdate({ _id: id }, data);
        return JSON.parse(JSON.stringify({ message : 'התעדכן בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const updateEmailOrPassword = async ( id : ObjectIdType , data: PasswordEmailType) => {
    try {
        let getUser = await UserModel.findById(id)

        if (!getUser) {
            throw new Error('משתמש זה לא קיים');
        }

        const isPasswordCorrect = bcrypt.compare(
            data.oldPassword,
            getUser.password
        );

        if(!isPasswordCorrect) {
            throw Error("הסיסמה שהקשת שגויה!")
        }

        if(data.email?.toLowerCase() !== getUser?.email?.toLowerCase()) {
            getUser.email = data.email
        }

        if(data.newPassword) {
            if(data?.newPassword && data?.confirmNewPassword) {
                getUser.password = await bcrypt.hash(data.newPassword, 10)
            }
        }

        const editUser = await UserModel.findOneAndUpdate({ _id: id }, getUser);
        return JSON.parse(JSON.stringify({ editUser, message : 'התעדכן בהצלחה' }));
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async ( email : string) => {
    try {
        let data = await UserModel.findOneAndDelete({email})
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        throw error;
    }
};

export const getAllOrganization = async () => {
    try {
        let data = await OrganizationModel.find()
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationById =  async (id : string) => {
    try {
        let data = await OrganizationModel.findById(id)
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationByEmail = async () => {
    try {
        const session : Session | null = await getServerSession(authOptions)
        let data = await OrganizationModel.find()
        let getByEmail = data.filter(org => org.members.includes(session?.user?.email))
        return JSON.parse(JSON.stringify(getByEmail))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationSlug =  async (slug : string) => {
    try {
        let data = await OrganizationModel.findOne({slug})
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getOrganizationByBoardId =  async (boardId : string) => {
    try {
        let {orgId} = await BoardModel.findById(boardId)
        let data = await OrganizationModel.findById(orgId)
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewOrganization =  async (data : OrganizationModelType) => {
    try {
        const session : Session | null= await getServerSession(authOptions)

        if(!session) {
            throw Error('רק משתמש מחובר יכול להוסיף ארגון !' )
        }

        let findOrg = await OrganizationModel.findOne({slug : data.slug})
        if(findOrg) {
            throw Error('ארגון בשם הזה כבר קיים !' )
        }

        let newOrgData = {
            ...data,
            admin : [session?.user?.email.toLowerCase()],
            members : [...data?.members.map(email => email.toLowerCase()) , session?.user?.email.toLowerCase()]
        }

        let newOrg = await OrganizationModel.create({
            ...newOrgData,
            admin : Array.from(new Set<string>(newOrgData.admin)),
            members : Array.from(new Set<string>(newOrgData.members))
        });

        return JSON.parse(JSON.stringify({ newOrg , message : 'הארגון התווסף בהצלחה !' }))
    } catch (error) {
        throw error;
    }
}

export const updateOrganization = async (slug : string , data: OrganizationModelType) => {
    try {
        if(data.members.length === 0) {
            await OrganizationModel.findOneAndDelete({slug})
        }

        await OrganizationModel.findOneAndUpdate({ slug }, data);
        return JSON.parse(JSON.stringify({ message : 'התעדכן בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const deleteOrgById = async (orgId : string) => {
    try {
        await BoardModel.deleteMany({orgId})
        await LogModel.deleteMany({orgId})
        await ListModel.deleteMany({orgId})
        await CardModel.deleteMany({orgId})
        await OrganizationModel.findByIdAndDelete(orgId)

        return JSON.parse(JSON.stringify({ message : 'נמחק בהצלחה' }));
    } catch (err) {
        throw err
    }
}

export const getAllBoards = async () => {
    try {
        let data = await BoardModel.find()
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getBoardsById = async (id : string) => {
    try {
        let data = await BoardModel.findById(id)
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw { find : false , error };
    }
}

export const getBoardsByOrgId = async (orgId : string) => {
    try {
        let data = await BoardModel.find({orgId})
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewBoard = async (data : BoardModelType) => {
    try {

        await BoardModel.create(data);

        return JSON.parse(JSON.stringify({message : 'הלוח התווסף בהצלחה !'}))
    } catch (error) {
        throw error;
    }
}

export const updateBoard = async (id : string , data: BoardModelType) => {
    try {
        if(!data.title) {
            throw Error("חובה לצרף כותרת !")
        }

        await BoardModel.findByIdAndUpdate(id, data);
        return JSON.parse(JSON.stringify({ message : 'הלוח התעדכן בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const deleteBoard = async (id : string) => {
    try {
        await BoardModel.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify({ message : 'הלוח נמחק בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const getAllList = async () => {
    try {
        let data = await ListModel.find().populate('cards')
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getListById = async (id : string) => {
    try {
        let data = await ListModel.findById(id).populate('cards')
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const getListByBordId = async (boardId : string) => {
    try {
        const data = await ListModel.find({ boardId }).populate('cards')
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        throw error;
    }
}

export const addNewList = async (data : ListModelType) => {
    try {
        let listCounter = await ListModel.countDocuments()
        const findByBoard = await ListModel.find({boardId : data.boardId})
        const checkListTitleExist = findByBoard.find(board => board.title === data.title)

        if(checkListTitleExist) {
            throw Error("רשימה בשם הזה כבר קיים!")
        }

        const newList = await ListModel.create({
            ...data,
            order : listCounter++
        });

        return JSON.parse(JSON.stringify({newList , message : 'הרשימה התווספה בהצלחה !'}))
    } catch (error) {
        throw error;
    }
}

export const cloneList = async (data : ListModelType) => {
    try {
        const { _id, order, createdAt , updatedAt , ...clonedList } = data;

        let listCounter = await ListModel.countDocuments()

        await ListModel.create({
            ...clonedList,
            title : `${data.title} העתק`,
            order : listCounter++
        });

        return JSON.parse(JSON.stringify({message : `${data.title} שוכפל בהצלחה !`}))
    } catch (err) {
        throw err
    }
}

export const cloneListAndCards = async (listId : string) => {
    try {
        let listCounter = await ListModel.countDocuments()
        const originalList = await ListModel.findById(listId).populate('cards')

        if (!originalList) {
            throw Error("רשימה לא קיימת כדי לשכפל...")
        }

        const { _id, order, createdAt , updatedAt , cards , title , boardId , ...clonedList } = originalList;

        const newList = new ListModel({
            boardId,
            title : `${title} העתק`,
            order : listCounter++,
        });

        const clonedCards = await Promise.all(
            originalList.cards.map(async (originalCard: CardModelType) => {
                const { _id, createdAt, updatedAt , title , order , description } = originalCard;
                const clonedCardDocument = await CardModel.create({ title , order , description , listId : newList._id });
                return clonedCardDocument._id;
            })
        );

        newList.cards = clonedCards

        await newList.save()

        return JSON.parse(JSON.stringify({message : `${originalList.title} שוכפל בהצלחה !`}))
    } catch (err) {
        throw err;
    }
}

export const updateList = async (id : string , data: ListModelType) => {
    try {
        const findByBoard = await ListModel.find({boardId : data.boardId})
        const checkListTitleExist = findByBoard.find(board => board.title === data.title)

        if(checkListTitleExist) {
            throw Error("רשימה בשם הזה כבר קיים!")
        }

        await ListModel.findByIdAndUpdate(id, data)
        return JSON.parse(JSON.stringify({ message : 'הרשימה התעדכנה בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const deleteList = async (listId : string) => {
    try {
        const list = await ListModel.findById(listId).populate('cards')

        if (!list) {
            throw new Error('לא נמצאה רשימה כזאת!');
        }

        const cardIds = list.cards.map((card: CardModelType) => card._id?.toString());

        await Promise.all(cardIds.map((cardId : string) => CardModel.deleteOne({ _id: cardId })));

        await ListModel.findByIdAndDelete(listId)
        return JSON.parse(JSON.stringify({ message : 'הרשימה נמחקה בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const updateListOrder = async (list : ListModelType[]) => {
    try {
        await Promise.all(list.map( async (listItem) => {
            await ListModel.findByIdAndUpdate(listItem._id , listItem)
            return listItem
        }))

        return JSON.parse(JSON.stringify({ message : 'עודכן הסדר ברשימה' }));
    } catch(err) {
        throw err;
    }
}

export const updateCardListOrder = async (cards : CardModelType[] , listId : string) => {
    try {
        await Promise.all(cards.map( async (cardItem) => {
            await CardModel.findByIdAndUpdate(cardItem._id , cardItem)
            return cardItem
        }))

        const cardIds = cards.map(card => card._id);
        await ListModel.findByIdAndUpdate(listId, { cards: cardIds });

        return JSON.parse(JSON.stringify({ message : 'עודכן הסדר ברשימה' }));
    } catch(err) {
        console.error("Error is : " , err)
        throw err;
    }
}

export const addNewCard = async (data : CardModelType , listId : string) => {
    try {
        const getListById = await ListModel.findById(listId)

        if(!getListById) {
            throw Error("לא קיימת רשימה כזאת!")
        }

        let newCard = await CardModel.create({...data, order : getListById.cards.length++ , listId})

        await ListModel.findByIdAndUpdate(
            listId,
            {
                $push: { cards: newCard._id },
            },
        );

        return JSON.parse(JSON.stringify({ message : `${data.title} נוספה בהצלחה` }));
    } catch (err) {
        throw err
    }
}

export const updateCard = async (card : CardModelType) => {
    try {
        await CardModel.findByIdAndUpdate(card._id, card)
        return JSON.parse(JSON.stringify({ message : `${card.title} התעדכן בהצלחה!` }));
    } catch (err) {

    }
}

export const deleteCard = async (listId : string , cardId : string) => {
    try {
        const getListById = await ListModel.findById(listId)
        getListById.cards = getListById.cards.filter((card : string) => card !== cardId)

        await ListModel.findByIdAndUpdate(listId,getListById)
        await CardModel.findByIdAndDelete(cardId)

        return JSON.parse(JSON.stringify({ message : 'הכריטיסייה נמחקה בהצלחה' }));
    } catch (err) {
        throw err
    }
}

export const updateCardBetweenList = async (fromList : ListModelType , toList : ListModelType , card : CardModelType) => {
    try {

        await CardModel.findByIdAndUpdate(card._id , card)

        let fromCards = fromList.cards?.map(fromCard => fromCard._id)
        await ListModel.findByIdAndUpdate(fromList._id, {...fromList, cards : fromCards})

        let toCards = toList.cards?.map(toCard => toCard._id)
        await ListModel.findByIdAndUpdate(toList._id, {...toList, cards : toCards})

        return JSON.parse(JSON.stringify({ message : 'הסדר שונה בהצלחה!' }));
    } catch (err) {

    }
}

export const cloneCard = async (card : CardModelType, list :ListModelType) => {
    try {
        const { _id , createdAt , updatedAt , order, title , ...cloneCard } = card
        let cards = list?.cards!
        let cardsIds = list?.cards?.map(cardId => cardId._id)

        const newCard = await CardModel.create({
            ...cloneCard,
            title : `${title} העתק`,
            order : cards.length++
        })

        cardsIds?.push(newCard?._id)

        await ListModel.findByIdAndUpdate(cloneCard.listId , {
            ...list,
            cards : cardsIds
        })

        return JSON.parse(JSON.stringify({ message : `${title} שוכפל בהצלחה !` }));
    } catch (err) {
        throw err
    }
}

type UpdateModel = "board" | "organization" | "list";
export const addNewLog = async (action : string, type : "delete" | "add" | "update" , idOfModel : string , userId : string , updateModel : UpdateModel , orgId : string) => {
    try {

        await LogModel.create({
            user : userId,
            [updateModel] : idOfModel,
            model : updateModel,
            orgId,
            type,
            action
        })

        return JSON.parse(JSON.stringify({ message : `התווספה פעילות חדשה..` }));
    } catch (err) {
        throw err
    }
}
export const getLogByOrg = async (organization : string) => {
    try {

        let getOrg = await OrganizationModel.findOne({ slug : organization })
        const data = await LogModel.find({orgId : getOrg?._id?.toString()!}).populate("user").populate("board").populate("organization").populate("list").exec();
        const sortByDate = data.sort((a , b) => (new Date(b?.createdAt)  as any) - (new Date(a?.createdAt) as any))
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        throw err
    }
}

export const updateCookie = (name : string , value : string) => {
    return cookies().set(name, value)
}