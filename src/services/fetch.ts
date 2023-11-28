'use server'
import bcrypt from "bcryptjs"
import {
    BoardModelType,
    CardModelType,
    ListModelType,
    ObjectIdType,
    OrganizationModelType,
    UserModelType
} from "@/types/Schema"
import UserModel from "@/utils/Database/models/UserModel"
import {PasswordEmailType} from "@/types/others";
import OrganizationModel from "../utils/Database/models/OrganizationModel";
import {getServerSession , Session } from "next-auth";
import { authOptions } from '@/utils/authOptions'
import BoardModel from "@/utils/Database/models/BoardModel";
import ListModel from "@/utils/Database/models/ListModel";
import CardModel from "@/utils/Database/models/CardModel";

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
        throw error;
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

        await ListModel.create({
            ...data,
            order : listCounter++
        });

        return JSON.parse(JSON.stringify({message : 'הרשימה התווספה בהצלחה !'}))
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
        const originalList = await ListModel.findById(listId)

        if (!originalList) {
            throw Error("רשימה לא קיימת כדי לשכפל...")
        }

        const { _id, order, createdAt , updatedAt , cards , title , ...clonedList } = originalList;

        const clonedCards = await Promise.all(
            originalList.cards.map(async (originalCard: CardModelType) => {
                const { _id, createdAt, updatedAt, ...clonedCard } = originalCard;
                const clonedCardDocument = await CardModel.create(clonedCard);
                return clonedCardDocument._id;
            })
        );

        return JSON.parse(JSON.stringify({message : `${originalList.title} שוכפל בהצלחה !`}))
        const updatedList = await ListModel.create({
                title : `${title} העתק`,
                order : listCounter++,
                $push: { cards: clonedCards },
            },
        );

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

        await ListModel.findByIdAndUpdate(id, data).exec();
        const updatedList = await ListModel.findById(id).populate('cards')
        return JSON.parse(JSON.stringify({ message : 'הרשימה התעדכנה בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const deleteList = async (id : string) => {
    try {
        await ListModel.findByIdAndDelete(id).populate('cards')
        return JSON.parse(JSON.stringify({ message : 'הרשימה נמחקה בהצלחה' }));
    } catch (err) {
        throw err;
    }
}

export const addNewCard = async (data : CardModelType , listId : string) => {
    try {
        const getListById = await ListModel.findById(listId)

        if(!getListById) {
            throw Error("לא קיימת רשימה כזאת!")
        }

        let newCard = await CardModel.create({...data, order : getListById.cards.length++})

        const updatedList = await ListModel.findByIdAndUpdate(
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