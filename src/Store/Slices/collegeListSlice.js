import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    collegeList:{},
    collegeListLoading: true,
    sortOrder: null,
    sortColumn:null
}

const binarySearch=(arr, target, key)=> {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid][key] === target) {
        return mid; // Found an exact match, insert before this index
      } else if (arr[mid][key] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left; // Return the index for insertion
  }

export const fetchCollegeList = createAsyncThunk('fetchCollegeList',async()=>{
    const response = await axios.get('http://universities.hipolabs.com/search?country=United+States')
    return response?.data
})

export const collegeListSlice = createSlice({
    name:'collegeListSlice',
    initialState,
    reducers:{
        changeSort:(state,action)=>{
            const data = state.collegeList
            const objectKey=action.payload
            const sortOrder = state.sortOrder
            state.collegeList=sortOrder==="Asc"?data.sort((a,b)=>b[objectKey].localeCompare(a[objectKey])):data.sort((a,b)=>a[objectKey].localeCompare(b[objectKey]))
            state.sortOrder=sortOrder==="Asc"?"Des":"Asc"
            state.sortColumn=objectKey
        },
        editCollegeList:(state,action)=>{
            const {name,newObj} = action.payload
            const newArray = state.collegeList.map((obj) => {
                if (obj.name === name) {
                  return newObj;
                } else {
                  return obj;
                }
            })
            state.collegeList=newArray
        },
        addCollegeList:(state,action)=>{
            if(state.sortOrder===null){
                state.collegeList.push(action.payload)
            }
            else{
                const insertIndex = binarySearch(state.collegeList,action.payload.name,state.sortColumn)
                state.collegeList.splice(insertIndex, 0, action.payload)
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCollegeList.pending,(state)=>{
            state.collegeListLoading=true
        })
        .addCase(fetchCollegeList.fulfilled,(state,action)=>{
            state.collegeList=action.payload
            state.collegeListLoading=false
        })
    }
})

export const {changeSort,editCollegeList,addCollegeList} = collegeListSlice.actions

export default collegeListSlice.reducer