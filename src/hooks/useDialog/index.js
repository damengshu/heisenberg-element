import { getCurrentInstance, nextTick, ref, unref, watchEffect, toRaw } from "vue"
import { isEqual } from "loadsh"

const dataTransferRef = ref({})

export function useDialog () {
  const dialog = ref(null)
  const loaded = ref(false)
  const uid = ref("")

  if (!getCurrentInstance()) {
    throw new Error(
      "useDialog() can only be used inside setup() or functional components!"
    )
  }

  /**
   * @param { Function } setPoprs
   * @param {string} uuid
   */
  function register (setPoprs, uuid) {
    uid.value = uuid
    dialog.value = setPoprs
    loaded.value = true
  }

  const getInstance = () => {
    const instance = unref(dialog);
    if (!instance) {
      console.error("useDialog instance is undefined!")
    }
    return instance
  }

  const methods = {
    setDialogProps: (props) => {
      getInstance() && getInstance().setDialogProps(props)
    },
    openDialog: (data, openOnSet = true) => {
      getInstance() && getInstance().setDialogProps({ value: true })
      if (!data) return
      if (openOnSet) {
        dataTransferRef.value = Object.assign({}, unref(dataTransferRef), {
          [unref(uid)]: null
        })

        dataTransferRef.value = Object.assign({}, unref(dataTransferRef), {
          [unref(uid)]: toRaw(data)
        })
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data))
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data)
      }
    },
    closeDialog: () => {
      getInstance() && getInstance().setDialogProps({ value: false });
    },
    setConfirmLoadong: (loading = true) => {
      getInstance() && getInstance().setDialogProps({ confirmLoading: loading });
    }
  }

  return [register, methods]
}

export function useDialogInner (callbackFn) {
  const drawerInstanceRef = ref(null)
  const currentInstance = getCurrentInstance().proxy
  const uidRef = ref('')

  if (!getCurrentInstance()) {
    throw new Error(
      "useDialogInner() can only be used inside setup() or functional components!"
    );
  }
  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDialogInner instance is undefined!');
      return;
    }
    return instance;
  }

  const register = (modalInstance, uuid) => {
    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
    currentInstance._setupContext.emit('register', modalInstance, uuid);
  };

  const methods = {
    setDialogProps: (props) => {
      getInstance() && getInstance().setDialogProps(props);
    },
    closeDialog: () => {
      getInstance() && getInstance().setDialogProps({ value: false });
    },
    setConfirmLoadong: (loading = true) => {
      getInstance() && getInstance().setDialogProps({ confirmLoading: loading });
    }
  }

  watchEffect(() => {
    const data = dataTransferRef.value[unref(uidRef)]
    if (!data) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data);
    })

  })

  return [
    register,
    methods
  ]

}

function isFunction (fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}
